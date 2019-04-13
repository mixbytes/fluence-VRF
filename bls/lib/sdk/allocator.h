#ifndef FLUENCE_C_SDK_ALLOCATOR_H
#define FLUENCE_C_SDK_ALLOCATOR_H

#include <stddef.h> // for size_t

extern "C" {

void *allocate(size_t size);
void deallocate(void *ptr, size_t size);

}

#endif //FLUENCE_C_SDK_ALLOCATOR_H
