<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use App\UseCases\Profile\Validate as ProfileValidate;
use Illuminate\Http\Request;
use App\UseCases\Validate;
use Error;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class ProfileController extends Controller
{

    public function __construct(Profile $profile)
    {
        $this->profile = $profile;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Validate $Validate
     * @return \Illuminate\Http\Response
     */
    public function store(
        Request $request,
        ProfileValidate $ProfileValidate
    ) {
        $error = $ProfileValidate($request);
        //バリデーション
        if (count($error) > 0) {
            return response()->json(['message' => $error]);
        }

        DB::beginTransaction();
        try {
            $this->profile->user_id = $request->id;
            $this->profile->description = $request->description;
            $this->profile->img_url = $request->img;
            $this->profile->profileName = $request->name;
            $this->profile->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            return response()->json(['error' => 'プロフィール更新エラー']);
        }

        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $id = Auth::id();
        $profile =  Profile::with('user')->where('user_id', '=', $id)->first();

        return $profile;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Validate $Validate
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [

            'description' => 'string|max:250',
        ]);

        if (!empty($request->file('image'))) {
            $fileName = $request->file('image')->getClientOriginalName();
            Storage::putFileAs('public/post_images', $request->file('image'), $fileName);
            $fullFilePath = 'storage/post_images/' . $fileName;
        }


        if ($validator->fails()) {
            return response()->json(['message' => '投稿ルールに反しています。'], 400);
        } else {
            DB::beginTransaction();
            try {
                $profile = Profile::find($request->id);
                $profile->description = $request->description;
                if (!empty($request->file('image'))) {
                    $profile->img_url = $fullFilePath;
                    Log::error('kk');
                }
                $profile->save();


                DB::commit();
                if (!empty($request->file('image'))) {
                    return $fullFilePath;
                }
            } catch (Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return response()->json(['error' => 'プロフィール更新エラー']);
            }
        }


        return true;
    }
}
