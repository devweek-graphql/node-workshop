module.exports = {
    performanceLogger: async (fn, tag) => {
        const t0 = performance.now();
        const something = await fn();
        const t1 = performance.now();
        console.log();
        console.log(`${tag} took: ${Math.trunc(t1 - t0)}ms`);
        return something;
    }
}