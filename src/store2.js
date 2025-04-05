import { createStore } from 'vuex';

const store2 = createStore({
    state() {
        return {
            score: parseInt(sessionStorage.getItem('current-score')) || 0,
            highScore: parseInt(sessionStorage.getItem('high-score')) || 0,
        };
    },
    mutations: {
        incrementScore(state, points) {
            state.score += points;
            if (state.score >= state.highScore) {
                sessionStorage.setItem('high-score', state.score);
                state.highScore = state.score;
            };
            sessionStorage.setItem('current-score', state.score); // Cập nhật vào sessionStorage
        },
        resetScore(state, demand) {
            if (demand = 'RESET') {
                state.score = 0;
            };
        }
    },
    actions: {
        incrementScore({ commit }, points) {
            commit('incrementScore', points);
        },
        resetScore({ commit }, demand) {
            commit('resetScore', demand);
        }
    }
});

export default store2;
