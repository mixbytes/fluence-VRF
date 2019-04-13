find_package(eosio.cdt)

set(SRC_FILES bls/src/bls_c256.cpp mcl/src/fp.cpp)

set(GLOB HEADERS "${CMAKE_CURRENT_SOURCE_DIR}/mcl/include/mcl/*.h"
                 "${CMAKE_CURRENT_SOURCE_DIR}/mcl/include/mcl/*.hpp"
                 "${CMAKE_CURRENT_SOURCE_DIR}/mcl/include/cybozu/*.hpp"
                 "${CMAKE_CURRENT_SOURCE_DIR}/blc/include/*.h"
                 "${CMAKE_CURRENT_SOURCE_DIR}/blc/include/*.hpp"
)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DCYBOZU_MINIMUM_EXCEPTION -DMCL_SIZEOF_UNIT=16 -DNDEBUG -DMCL_MAX_BIT_SIZE=384 -DCYBOZU_DONT_USE_STRING -DCYBOZU_DONT_USE_EXCEPTION -DMCL_DONT_USE_CSPRNG -DBLS_MINIMUM_API -DBLS_ONLY_VERIFY -DMCLBN_FP_UNIT_SIZE=4 ")

add_library(bls
            ${SRC_FILES}
            ${HEADERS}
)

include_directories(bls    "${CMAKE_CURRENT_SOURCE_DIR}/mcl/include"
                           "${CMAKE_CURRENT_SOURCE_DIR}/bls/include"
                           "${CMAKE_CURRENT_SOURCE_DIR}"
)

target_link_libraries(bls c c++)


install(TARGETS bls EXPORT bls
   LIBRARY DESTINATION ${CMAKE_CURRENT_SOURCE_DIR}
   ARCHIVE DESTINATION ${CMAKE_CURRENT_SOURCE_DIR})
