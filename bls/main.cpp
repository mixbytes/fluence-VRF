#include <stdlib.h>
#include <string>

#ifndef NOBLS
#include <sdk.h>
#include <bls/bls.hpp>
#endif

#define UNUSED(x) (void)(x)
void* memset(void *ptr, int a, size_t b) {
    char* dest = (char*) ptr;
    for (size_t t = 0; t < b; ++t) {
        *(dest + t) = a;
    }
    return dest;
}

void init() {
    static bool inited = false;

    if (inited)
        return;

#ifndef NOBLS
    bls::init();
#endif
}

extern "C" {
char *invoke(const char *str, int length) {
#ifndef NOBLS
    init();

//    bls::Signature s;
    bls::PublicKey pk;

    pk.setStr(std::string(str));

    std::string string;
    pk.getStr(string);

    return (char*)string.data();
#else
    return 0;
#endif
}

static int game_id_autoinc = 0;


struct pub_key_type {
    char *data;
    int len;
};

struct signature_type {
    char *data;
    int len;
};

struct hash_type {
    char *data;
    int len;
};


struct Game {
    bool new_game(int n) {
        len = 0;
        players = (char**)malloc(sizeof(char*) * n);
        stakes = (int*)malloc(sizeof(int) * n);
        game_id = game_id_autoinc++;
        signs = (signature_type*)malloc(sizeof(signature_type) * n);
        reveals = 0;
        threshold = n * 2 / 3 + 1;
        winner = -1;


        state = STATE_GATHERING_STAKES;
        return true;
    }

    bool add_stake(int stake, pub_key_type pub_key) {
        if (state != STATE_GATHERING_STAKES)
            return false;

        stakes[len] = stake;
        players[len] = pub_key.data;
        ++len;
        return true;
    }

    int get_stake(pub_key_type pub_key) {
        if (state == STATE_NOT_STARTED)
            return 0;

        for (int i = 0; i < len; i++) {
            if (compare(players[i], pub_key.data, pub_key.len))
                return stakes[i];
        }
        return 0;
    }

    int get_game_id() {
        return game_id;
    }

    char** get_participants() {
        if (state == STATE_NOT_STARTED)
            return 0;

        return players;
    }

    bool is_winner(pub_key_type pub_key) {
        if (state != STATE_REVEALING || winner.len != pub_key.len)
            return false;

        return compare(winner.data, pub_key.data, winner.len);
    }

    int game_status() {
        return state;
    }

    bool reveal(pub_key_type pub_key, hash_type game_id_hash, signature_type sign) {
        blsSignature s;
        blsPublicKey pk;

        mclBnG1_setStr(&s.v, sign.data, sign.len, 512);
        mclBnG2_setStr(&pk.v, pub_key.data, pub_key.len, 0);

        if (!blsVerify(&s, &pk, game_id_hash.data, game_id_hash.len)) {
            return;
        }

        signs[reveals++] = sign;

        if (reveals == threshold) {
            winner = players[blsAggregate(signs, reveals)];
        }

        state = STATE_DONE;
    }

private:
    bool compare(char *a, char *b, int len) {
        for (int i = 0; i < len; i++) {
            if (a[i] != b[i])
                return false;
        }
        return true;
    }

private:
    static const int STATE_NOT_STARTED = 0;
    static const int STATE_GATHERING_STAKES = 1;
    static const int STATE_REVEALING = 2;
    int state;

    int *stakes;
    char **players;
    int len;
    int game_id;

    pub_key_type winner;
};


}
