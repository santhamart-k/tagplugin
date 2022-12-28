class EventEmitter {
    constructor() {
        this.events = {};
    }
    _getEventListByName(e) {
        return void 0 === this.events[e] && (this.events[e] = new Set()), this.events[e];
    }
    on(e, t) {
        this._getEventListByName(e).add(t);
    }
    once(e, t) {
        const s = this,
            r = function (...n) {
                s.removeListener(e, r), t.apply(s, n);
            };
        this.on(e, r);
    }
    emit(e, ...t) {
        this._getEventListByName(e).forEach(
            function (e) {
                e.apply(this, t);
            }.bind(this)
        );
    }
    removeListener(e, t) {
        this._getEventListByName(e).delete(t);
    }
}
class ChromeMessenger extends EventEmitter {
    constructor() {
        super(), (this.requestsInProgress = 0), console.log("ChromeMessenger instance created");
    }
    sendMessage(e, t) {
        return (
            (t = { from: "msos", ...(t = "string" == typeof e ? { ...t, subject: e } : e) }),
            this.requestsInProgress++,
            this.emit("aboutToSend", t),
            new Promise((e, s) => {
                chrome.runtime.sendMessage(chrome.runtime.id, t, (r) => {
                    r ? (this.requestsInProgress--, this.emit("responseReceived", r), this.checkInProgress(), e(r)) : s({ msg: "Something went wrong!", scope: document.currentScript, lastError: chrome.runtime.lastError, obj: t });
                });
            })
        );
    }
    checkInProgress() {
        0 === this.requestsInProgress && this.emit("allDone");
    }
}
class ExtractPageVariable {
    constructor(e) {
        (this._variableName = e), (this._handShake = this._generateHandshake()), this._inject(), (this._data = this._listen());
    }
    get data() {
        return this._data;
    }
    _generateHandshake() {
        return Math.random().toString().slice(2, 11);
    }
    _inject() {
        const e = `( ${((e, t) => {
                const s = { handShake: e };
                (s[t] = JSON.parse(
                    ((e) => {
                        let t = Object.fromEntries(Object.entries(e));
                        return (
                            Object.keys(t).forEach((e) => {
                                t[e].toString().includes("[object Window]") && delete t[e];
                            }),
                            JSON.stringify(
                                t,
                                (() => {
                                    const e = new WeakSet();
                                    return (t, s) => {
                                        if ("object" == typeof s && null !== s) {
                                            if (e.has(s)) return;
                                            e.add(s);
                                        }
                                        return s;
                                    };
                                })()
                            )
                        );
                    })(window[t])
                )),
                    window.postMessage(s, "*");
            }).toString()} )('${this._handShake}', '${this._variableName}');`,
            t = document.createElement("script"),
            s = document.createTextNode(e);
        (t.id = "chromeExtensionDataPropagator"), t.appendChild(s), document.body.append(t);
    }
    _listen() {
        return new Promise((e) => {
            window.addEventListener(
                "message",
                ({ data: t }) => {
                    t.handShake == this._handShake && e(t);
                },
                !1
            );
        });
    }
}
const serial = (e) => e.reduce((e, t) => e.then((e) => t().then(Array.prototype.concat.bind(e))), Promise.resolve([])),
    MakeQuerablePromise = (e) => {
        if (e.isResolved) return e;
        let t = !0,
            s = !1,
            r = !1;
        return (
            e.then(
                (e) => ((r = !0), (t = !1), e),
                (e) => {
                    throw ((s = !0), (t = !1), e);
                }
            ),
            (e.isFulfilled = () => r),
            (e.isPending = () => t),
            (e.isRejected = () => s),
            e
        );
    },
    waitForElement = (e) => {
        let t,
            s = new Promise((s, r) => {
                let n = document.querySelector(e);
                if (
                    ((t = (e) => {
                        s(e);
                    }),
                    n)
                )
                    return void s(n);
                let o = new MutationObserver((t) => {
                    t.forEach((t) => {
                        let r = Array.from(t.addedNodes);
                        for (let t of r) {
                            let r = t.querySelector ? t.querySelector(e) : null;
                            if ((t.matches && t.matches(e) && (r = t), r)) return o.disconnect(), void s(r);
                        }
                    });
                });
                o.observe(document.documentElement, { childList: !0, subtree: !0 });
            });
        return (s.cancel = t), MakeQuerablePromise(s);
    };
let copyToClipboard = (e) => {
    let t = document.createElement("textarea");
    (t.value = e), t.setAttribute("readonly", ""), (t.style.position = "absolute"), (t.style.left = "-9999px"), document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
};
const __ChromeMessenger = new ChromeMessenger();
