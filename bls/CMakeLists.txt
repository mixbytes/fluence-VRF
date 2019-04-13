project(bls)

find_package(eosio.cdt)

set(CC "/usr/bin/eosio-cpp")
set(C "usr/bin/eosio-cc")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DCYBOZU_MINIMUM_EXCEPTION -DMCL_SIZEOF_UNIT=16 -DNDEBUG -DMCL_MAX_BIT_SIZE=384 -DCYBOZU_DONT_USE_EXCEPTION -DCYBOZU_DONT_USE_STRING -DMCL_DONT_USE_CSPRNG -DBLS_MINIMUM_API -DBLS_ONLY_VERIFY -DMCLBN_FP_UNIT_SIZE=4")

set(SRC_FILES lib/bls/src/bls_c256.cpp lib/mcl/src/fp.cpp lib/sdk/allocator.cpp lib/sdk/logger.cpp)
add_executable(bls.wasm main.cpp ${SRC_FILES})
