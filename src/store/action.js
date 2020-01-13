export default {
    addfun(context, n) {
        setTimeout(() => {
            context.commit('add', n);
        }, 1000);
    }
};