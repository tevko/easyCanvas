describe('Check easyCanvas Object', function() {
    var t = document.createElement('canvas');
    t.classList.add('test');
    document.body.appendChild(t);
    var test = Object.create(easyCanvas);
    test.init('.test', '2d').setBG('orange');
    it('Should return an Object', function() {
        expect(typeof test).toBe('object');
    });
});