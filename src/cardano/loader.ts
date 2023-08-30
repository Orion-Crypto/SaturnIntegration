class Loader {
    _wasm: any;

    async load() {
        if (this._wasm) return;

        this._wasm = await import('@dcspark/cardano-multiplatform-lib-browser');
    }

    get Cardano() {
        return this._wasm;
    }
}

export default new Loader();
