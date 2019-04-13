#include <stdlib.h>

struct pub_key_type {
	char *data;
	int len;
};

struct Game {
	bool new_game(int n) {
	    if (state != STATE_NOT_STARTED)
	        return false;

		len = 0;
		players = (char**)malloc(sizeof(char*) * n);
		stakes = (int*)malloc(sizeof(int) * n);

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
	        return false;

		for (int i = 0; i < len; i++) {
			if (compare(players[i], pub_key.data, pub_key.len))
				return stakes[i];
		}
		return 0;
	}

	bool compare(char *a, char *b, int len) {
		for (int i = 0; i < len; i++) {
			if (a[i] != b[i])
				return false;
		}
		return true;
	}


	int game_id() {
		return 42;
	}

	char** get_participants() {
	    if (state == STATE_NOT_STARTED)
	        return 0;

		return players;
	}
private:
    static const int STATE_NOT_STARTED = 0;
    static const int STATE_GATHERING_STAKES = 1;
    static const int STATE_REVEALING = 2;
    int state;

	int *stakes;
	char **players;
	int len;
};

