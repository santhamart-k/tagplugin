let promiseBooleans = { isPending: () => !1, isRejected: () => !1, isFulfilled: () => !1 },
    phoneInputPromise = { ...promiseBooleans },
    sessionIdPromise = { ...promiseBooleans },
    msTypingInterval = 300,
    simulateClick = (e) => (
        e.dispatchEvent(new PointerEvent("pointerdown", { bubbles: !0 })),
        e.dispatchEvent(new MouseEvent("mousedown", { bubbles: !0 })),
        e.dispatchEvent(new PointerEvent("pointerup", { bubbles: !0 })),
        e.dispatchEvent(new MouseEvent("mouseup", { bubbles: !0 })),
        e.dispatchEvent(new MouseEvent("mouseout", { bubbles: !0 })),
        e.dispatchEvent(new MouseEvent("click", { bubbles: !0 })),
        !0
    ),
    tryToCall = (e, t) => {
        const o = document.querySelector('outbound-dial [aria-label="Make a call."], #dial-button');
        o && simulateClick(o),
            phoneInputPromise &&
                !phoneInputPromise.isPending() &&
                (phoneInputPromise = waitForElement(".input-container input, .phone-input-area .phone-input")).then((o) => {
                    (o.value = e.replaceAll(/[^\+0-9]/gi, "")),
                        o.dispatchEvent(new Event("input", { bubbles: !0 })),
                        t &&
                            waitForElement('[aria-label="dial"], .phone-input-area material-button:not(disabled)').then((e) => {
                                simulateClick(e);
                            });
                });
    },
    showSessionId = (e) => {
        let t = Date.now();
        addCallToHistory(e, t).then(() => {
            let e = document.querySelector("#call-history"),
                t = e && e.classList && e.classList.contains("active");
            e && e.parentElement.removeChild(e), loadCallHistory(t, !t);
        });
    },
    loadCallHistory = (e, t) => {
        __ChromeMessenger.sendMessage("callHistory").then((o) => {
            o.calls.length >= 0 &&
                fetch(chrome.runtime.getURL("templates/speakeasy-history.html"))
                    .then((e) => e.text())
                    .then(async (s) => {
                        (s = s.replace(/(src|href)=["'](?!http|\#)([a-zA-Z0-9\/\-\.]+?)["']/g, (e, t, o) => `${t}="${chrome.runtime.getURL(o)}"`)),
                            (o.newTag = t),
                            o.calls.sort((e, t) => t.timestamp - e.timestamp),
                            (s = Handlebars.compile(s)(o)),
                            document.body.insertAdjacentHTML("beforeend", s),
                            e && document.querySelector("#call-history").classList.add("active");
                    });
        });
    },
    typePin = (e) => {
        let t = (e) => {
            if (e.length > 0) {
                ((e) => {
                    "1234567890".includes(e) ? triggerKeyboardEvent(document.body, "up", 48 + parseInt(e)) : "#" === e && triggerKeyboardEvent(document.body, "up", 51, { shiftKey: !0 });
                })(e.pop()),
                    setTimeout(() => t(e), msTypingInterval);
            }
        };
        (e = e.replaceAll(" ", "").split("").reverse()), t(e);
    },
    addCallToHistory = (e, t) => __ChromeMessenger.sendMessage("addCallToHistory", { sessionId: e, timestamp: t });
chrome.runtime.onMessage.addListener(async (e, t) => {
    console.log(e, t), "msos" === e.from && ("callPhone" === e.subject ? tryToCall(e.phone, e.autoCall) : "sessionId" === e.subject ? showSessionId(e.sessionId) : "typePin" === e.subject && typePin(e.pin));
}),
    document.addEventListener("click", (e) => {
        let t = e.path[0];
        if (t)
            if (t.classList && t.classList.contains("copiable")) copyToClipboard(t.innerText);
            else if (t.matches("#call-history h2")) {
                const e = document.querySelector("#call-history h2 .alert");
                document.querySelector("#call-history").classList.toggle("active"), e && e.remove();
            } else
                for (let t of e.path)
                    if (t.matches && t.matches("material-button button[type=submit]")) {
                        let e = document.querySelector("#call-history");
                        e && e.parentElement.removeChild(e);
                        break;
                    }
    }),
    document.addEventListener("keydown", (e) => {
        if (e.target.matches && e.target.matches(".input-container input") && "Enter" === e.key) {
            let e = document.querySelector("#call-history");
            e && e.parentElement.removeChild(e);
        }
    });
let triggerKeyboardEvent = (e, t, o, s) => {
    let c = "msos_" + Date.now();
    e.setAttribute(c, "");
    let n = e.tagName + "[" + c + "]";
    s = { ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, altGraphKey: !1, ...s };
    let r = document.createElement("script");
    (r.textContent =
        "(" +
        function (e, t, o, s, c) {
            let n = document.querySelector(s);
            n.removeAttribute(o);
            let r = document.createEvent("KeyboardEvents");
            r.initKeyboardEvent(`key${e}`, !0, !1, window, "", 0, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.altGraphKey);
            let l = { get: () => t },
                a = { get: () => String.fromCharCode(t) };
            Object.defineProperties(r, { charCode: l, which: l, keyCode: l, key: a, char: a }), n.dispatchEvent(r);
        } +
        `)("${t}", ${o}, "${c}", "${n}", ${JSON.stringify(s)})`),
        (document.head || document.documentElement).appendChild(r),
        r.parentNode.removeChild(r),
        r.removeAttribute(c);
};
loadCallHistory();
const setupAutoFill = (e) => {
        Promise.all([
            fetch(chrome.runtime.getURL("templates/google-meet-todo.html")),
            __ChromeMessenger.sendMessage("getGoogleMeetTodoTaskAd"),
            __ChromeMessenger.sendMessage("getGoogleMeetTodoTaskCM"),
            __ChromeMessenger.sendMessage("getGoogleMeetTodoTaskEC"),
            __ChromeMessenger.sendMessage("getGoogleMeetTodoTaskGA4"),
        ])
            .then((e) => Promise.all([e.shift().text(), ...e]))
            .then(async (t) => {
                console.log(t);
                let o = t[0],
                    s = t[1],
                    c = t[2],
                    n = t[3],
                    r = t[4];
                (o = o.replace(/(src|href)=["'](?!http|\#)([a-zA-Z0-9\/\-\.]+?)["']/g, (e, t, o) => `${t}="${chrome.runtime.getURL(o)}"`)),
                    (o = Handlebars.compile(o)({ tasksA: s, tasksB: c, tasksC: n, tasksD: r, options: e })),
                    document.querySelector(".main").insertAdjacentHTML("beforeend", o);
                let l = document.querySelector("#ww-todo"),
                    a = l.querySelectorAll("input[type=checkbox]");
                l.querySelector("#ww-todo-reset").addEventListener("click", (e) => {
                    a.forEach((e) => {
                        e.checked = !1;
                    }),
                        (l.querySelector("#ww-cbt1-done").checked = !0),
                        (l.querySelector("#ww-cbt2-done").checked = !0),
                        (l.querySelector("#ww-cbt3-done").checked = !0),
                        (l.querySelector("#ww-cbt4-done").checked = !0);
                }),
                    l.querySelector("#ww-todo-close").addEventListener("click", (e) => {
                        toggleGoogleMeetTodo();
                    }),
                    l.querySelector("#ww-todo-open").addEventListener("click", (e) => {
                        toggleGoogleMeetTodo();
                    });
                var i = document.getElementById("task-select");
                let d = i.value;
                document.querySelector("#taskAdsAD").classList.toggle("hide-task-checklist"),
                    document.querySelector("#taskAdsAD").querySelector(".container .tasks").classList.toggle("open"),
                    l.querySelector("#task-select").addEventListener("change", (e) => {
                        var t = "#" + i.value,
                            o = "#" + d;
                        document.querySelector(t).classList.toggle("hide-task-checklist"),
                            document.querySelector(t).querySelector(".container.tasks").classList.toggle("open"),
                            document.querySelector(o).classList.toggle("hide-task-checklist"),
                            document.querySelector(o).querySelector(".container.tasks").classList.toggle("open"),
                            (d = i.value);
                    }),
                    a.forEach((e) => {
                        e.addEventListener("input", (e) => {
                            switch (
                                ((e.currentTarget.matches("#ww-cbt1-done") || e.currentTarget.matches("#ww-cbt2-done") || e.currentTarget.matches("#ww-cbt3-done") || e.currentTarget.matches("#ww-cbt4-done")) && toggleGoogleMeetTodo(),
                                i.value)
                            ) {
                                case "taskAdsAD":
                                    0 === l.querySelectorAll("#taskAdsAD input[type=checkbox]:not(:checked)").length ? (l.querySelector("#ww-cbt1-done").checked = !1) : (l.querySelector("#ww-cbt1-done").checked = !0);
                                    break;
                                case "taskCM":
                                    0 === l.querySelectorAll("#taskCM input[type=checkbox]:not(:checked)").length ? (l.querySelector("#ww-cbt2-done").checked = !1) : (l.querySelector("#ww-cbt2-done").checked = !0);
                                    break;
                                case "taskEC":
                                    0 === l.querySelectorAll("#taskEC input[type=checkbox]:not(:checked)").length ? (l.querySelector("#ww-cbt3-done").checked = !1) : (l.querySelector("#ww-cbt3-done").checked = !0);
                                    break;
                                case "taskGA4":
                                    0 === l.querySelectorAll("#taskGA4 input[type=checkbox]:not(:checked)").length ? (l.querySelector("#ww-cbt4-done").checked = !1) : (l.querySelector("#ww-cbt4-done").checked = !0);
                            }
                        });
                    }),
                    l.querySelector("#ww-show-checked").addEventListener("click", (e) => {
                        e.preventDefault();
                        const t = l.querySelector(".container.tasks.open");
                        t.matches(".show-checked") ? (e.currentTarget.querySelector("span").innerText = "show") : (e.currentTarget.querySelector("span").innerText = "hide"),
                            toggleTodoShowChecked(),
                            __ChromeMessenger.sendMessage("setOptions", { obj: { meet: { todoShowChecked: t.matches(".show-checked") } } });
                    }),
                    e.meet.autoShowTodo && toggleGoogleMeetTodo();
            });
    },
    toggleGoogleMeetTodo = () => {
        document.querySelector("#ww-todo").classList.toggle("active");
    },
    toggleTodoShowChecked = () => {
        document.querySelector("#ww-todo .container.tasks.open").classList.toggle("show-checked");
    };
__ChromeMessenger.sendMessage("getOptions").then((e) => {
    null !== e.meet.autoShowTodo && setupAutoFill(e);
});
