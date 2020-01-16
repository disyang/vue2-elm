export default {
    addfun(context: any, n: number) {
        setTimeout(() => {
            context.commit('add', n);
        }, 1000);
    }
};