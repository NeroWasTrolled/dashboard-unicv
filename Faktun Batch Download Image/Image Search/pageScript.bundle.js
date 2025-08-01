( () => {
    "use strict";
    !function() {
        const t = window;
        if (location.href.match("mobile.yangkeduo.com/goods.*.html")) {
            let e = setInterval(( () => {
                t.rawData && (window.postMessage({
                    topic: "ftk-set-data",
                    data: JSON.parse(JSON.stringify(t.rawData))
                }, "*"),
                clearInterval(e))
            }
            ), 1e3)
        }
    }(),
    function() {
        const t = window;
        if (location.href.match("mercadolibre.com")) {
            let e = setInterval(( () => {
                t.__PRELOADED_STATE__.initialState.components && (window.postMessage({
                    topic: "ftk-set-data",
                    data: {
                        ftk_pictures: t.__PRELOADED_STATE__.initialState.components.gallery.pictures,
                        ftk_variations: t.__PRELOADED_STATE__.initialState.components.variations
                    }
                }, "*"),
                clearInterval(e))
            }
            ), 1e3)
        }
    }(),
    function() {
        const t = window;
        if (location.href.match("www\\.lazada\\..*/products")) {
            let e = setInterval(( () => {
                t.__moduleData__ && (window.postMessage({
                    topic: "ftk-set-data",
                    data: {
                        __moduleData__: t.__moduleData__
                    }
                }, "*"),
                clearInterval(e))
            }
            ), 1e3)
        }
    }(),
    function() {
        const t = window;
        if (location.href.match("www.temu.com/.*\\.html")) {
            let e = setInterval(( () => {
                t.rawData && (window.postMessage({
                    topic: "ftk-set-data",
                    data: {
                        rawData: {
                            store: t.rawData.store
                        }
                    }
                }, "*"),
                clearInterval(e))
            }
            ), 1e3)
        }
    }(),
    function() {
        const t = window;
        if (location.href.match("wendaoerp.com")) {
            let e = setInterval(( () => {
                t.product && (window.postMessage({
                    topic: "ftk-set-data",
                    data: t.product
                }, "*"),
                clearInterval(e))
            }
            ), 1e3)
        }
    }(),
    function() {
        let t = 0
          , e = window
          , a = setInterval(( () => {
            e.Shopify && (window.postMessage({
                topic: "ftk-set-data",
                data: {
                    Shopify: {
                        shop: e.Shopify.shop
                    }
                }
            }, "*"),
            clearInterval(a)),
            t++,
            t > 50 && clearInterval(a)
        }
        ), 100)
    }(),
    function() {
        if (location.href.match(/google\.com\/search/)) {
            let t = 0
              , e = setInterval(( () => {
                t++,
                t > 50 && clearInterval(e);
                const a = document.querySelectorAll('[jsdata^="j0Opre"]');
                if (a.length > 0) {
                    clearInterval(e);
                    const t = {};
                    a.forEach((e => {
                        const a = (e.getAttribute("jsdata") || "").split(";")[2];
                        a && (t[a] = function(t) {
                            const e = window.W_jd[t]
                              , a = Object.getOwnPropertySymbols(e);
                            let o = null;
                            for (const t of a)
                                if (void 0 === t.description) {
                                    o = t;
                                    break
                                }
                            if (o) {
                                const t = e[o];
                                if (t && t.hasOwnProperty("Np")) {
                                    return t.Np[1].Np
                                }
                                console.error("使用 Symbol() 访问到的值不是一个对象，或者该对象没有 Np 属性。")
                            } else
                                console.error("对象中未找到没有描述的 Symbol() 键。")
                        }(a))
                    }
                    )),
                    window.postMessage({
                        cmd: "google-nps",
                        data: t
                    }, "*")
                }
            }
            ), 100)
        }
    }()
}
)();
