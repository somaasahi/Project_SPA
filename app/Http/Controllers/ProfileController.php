<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\UseCases\Profile\Validate as ProfileValidate;
use Illuminate\Http\Request;
use App\UseCases\Validate;
use Error;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        )
    {
        $error = $ProfileValidate($request);
        //バリデーション
        if(count($error) > 0){
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
    public function show($id)
    {
        $profile =  Profile::where('user_id', '=', $id)->get();

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
    public function update(
        Request $request,
        ProfileValidate $ProfileValidate
        )
    {
        $error = $ProfileValidate($request);
        //バリデーション
        if(count($error) > 0){
            return response()->json(['message' => $error]);
        }

        DB::beginTransaction();
        try {
            $profile = Profile::find($request->id);

            $profile->description = $request->description;
            $profile->img_url = $request->img;
            $profile->profileName = $request->name;

            $profile->update();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());
            return response()->json(['error' => 'プロフィール更新エラー']);
        }


        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
