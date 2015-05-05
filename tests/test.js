describe('Check easyCanvas Object', function() {
    var t = document.createElement('canvas');
    t.classList.add('test');
    document.body.appendChild(t);
    var test = easyCanvas.create('.test', '2d');
    it('Should return an Object', function() {
        expect(typeof test).toBe('object');
    });
});