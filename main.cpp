#include <stdlib.h>

struct pub_key_type {
	char *data;
	int len;
};

struct Game {
	bool new_game(int n) {
		len = 0;
		players = (char**)malloc(sizeof(char*) * n);
		stakes = (int*)malloc(sizeof(int) * n);
	    return true;
	}

	bool add_stake(int stake, pub_key_type pub_key) {
	    stakes[len] = stake;
	    players[len] = pub_key.data;
	    ++len;
	}

	int get_stake(pub_key_type pub_key) {
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
		return players;
	}
private:
	int *stakes;
	char **players;
	int len;
};

