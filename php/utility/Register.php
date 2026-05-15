<?php
declare(strict_types=1);

// Parkleitsystem SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ParkleitsystemUtility::setRegistrar(function (ParkleitsystemUtility $u): void {
    $u->clean = [ParkleitsystemClean::class, 'call'];
    $u->done = [ParkleitsystemDone::class, 'call'];
    $u->make_error = [ParkleitsystemMakeError::class, 'call'];
    $u->feature_add = [ParkleitsystemFeatureAdd::class, 'call'];
    $u->feature_hook = [ParkleitsystemFeatureHook::class, 'call'];
    $u->feature_init = [ParkleitsystemFeatureInit::class, 'call'];
    $u->fetcher = [ParkleitsystemFetcher::class, 'call'];
    $u->make_fetch_def = [ParkleitsystemMakeFetchDef::class, 'call'];
    $u->make_context = [ParkleitsystemMakeContext::class, 'call'];
    $u->make_options = [ParkleitsystemMakeOptions::class, 'call'];
    $u->make_request = [ParkleitsystemMakeRequest::class, 'call'];
    $u->make_response = [ParkleitsystemMakeResponse::class, 'call'];
    $u->make_result = [ParkleitsystemMakeResult::class, 'call'];
    $u->make_point = [ParkleitsystemMakePoint::class, 'call'];
    $u->make_spec = [ParkleitsystemMakeSpec::class, 'call'];
    $u->make_url = [ParkleitsystemMakeUrl::class, 'call'];
    $u->param = [ParkleitsystemParam::class, 'call'];
    $u->prepare_auth = [ParkleitsystemPrepareAuth::class, 'call'];
    $u->prepare_body = [ParkleitsystemPrepareBody::class, 'call'];
    $u->prepare_headers = [ParkleitsystemPrepareHeaders::class, 'call'];
    $u->prepare_method = [ParkleitsystemPrepareMethod::class, 'call'];
    $u->prepare_params = [ParkleitsystemPrepareParams::class, 'call'];
    $u->prepare_path = [ParkleitsystemPreparePath::class, 'call'];
    $u->prepare_query = [ParkleitsystemPrepareQuery::class, 'call'];
    $u->result_basic = [ParkleitsystemResultBasic::class, 'call'];
    $u->result_body = [ParkleitsystemResultBody::class, 'call'];
    $u->result_headers = [ParkleitsystemResultHeaders::class, 'call'];
    $u->transform_request = [ParkleitsystemTransformRequest::class, 'call'];
    $u->transform_response = [ParkleitsystemTransformResponse::class, 'call'];
});
