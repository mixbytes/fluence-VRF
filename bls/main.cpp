#include <sdk.h>
#include <stdlib.h>

#include <bls/bls.hpp>
#include <string>

#define UNUSED(x) (void)(x)
void* memset(void *ptr, int a, size_t b) {
    char* dest = (char*) ptr;
    for (size_t t = 0; t < b; ++t) {
        *(dest + t) = a;
    }
}

void init() {
    static bool inited = false;

    if (inited)
        return;

    bls::init();
}

extern "C" {
char *invoke(const char *str, int length) {
    init();

//    bls::Signature s;
    bls::PublicKey pk;

    pk.setStr(std::string(str));

    std::string string;
    pk.getStr(string);

    return (char*)string.data();
}
}
