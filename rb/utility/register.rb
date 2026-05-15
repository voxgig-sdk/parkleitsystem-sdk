# Parkleitsystem SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ParkleitsystemUtility.registrar = ->(u) {
  u.clean = ParkleitsystemUtilities::Clean
  u.done = ParkleitsystemUtilities::Done
  u.make_error = ParkleitsystemUtilities::MakeError
  u.feature_add = ParkleitsystemUtilities::FeatureAdd
  u.feature_hook = ParkleitsystemUtilities::FeatureHook
  u.feature_init = ParkleitsystemUtilities::FeatureInit
  u.fetcher = ParkleitsystemUtilities::Fetcher
  u.make_fetch_def = ParkleitsystemUtilities::MakeFetchDef
  u.make_context = ParkleitsystemUtilities::MakeContext
  u.make_options = ParkleitsystemUtilities::MakeOptions
  u.make_request = ParkleitsystemUtilities::MakeRequest
  u.make_response = ParkleitsystemUtilities::MakeResponse
  u.make_result = ParkleitsystemUtilities::MakeResult
  u.make_point = ParkleitsystemUtilities::MakePoint
  u.make_spec = ParkleitsystemUtilities::MakeSpec
  u.make_url = ParkleitsystemUtilities::MakeUrl
  u.param = ParkleitsystemUtilities::Param
  u.prepare_auth = ParkleitsystemUtilities::PrepareAuth
  u.prepare_body = ParkleitsystemUtilities::PrepareBody
  u.prepare_headers = ParkleitsystemUtilities::PrepareHeaders
  u.prepare_method = ParkleitsystemUtilities::PrepareMethod
  u.prepare_params = ParkleitsystemUtilities::PrepareParams
  u.prepare_path = ParkleitsystemUtilities::PreparePath
  u.prepare_query = ParkleitsystemUtilities::PrepareQuery
  u.result_basic = ParkleitsystemUtilities::ResultBasic
  u.result_body = ParkleitsystemUtilities::ResultBody
  u.result_headers = ParkleitsystemUtilities::ResultHeaders
  u.transform_request = ParkleitsystemUtilities::TransformRequest
  u.transform_response = ParkleitsystemUtilities::TransformResponse
}
