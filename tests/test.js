describe('Check easyCanvas Object', function() {
    var test = easyCanvas.create('.test', '2d');
    it('Should return an Object', function() {
        expect(typeof test).toBe('object');
    });
});