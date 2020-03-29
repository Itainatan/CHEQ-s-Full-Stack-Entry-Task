function getXML(vast) {
    let xml;
    const { id, vast_url, position, width, height } = vast[0] || {};
    if (id)
        xml = [{
            VAST: [{ _attr: { version: "2.0" } },
            {
                Ad: [
                    {
                        InLine: [
                            {
                                AdSystem: "2.0"
                            },
                            {
                                Impression: {}
                            },
                            {
                                Creatives: [
                                    {
                                        Creative: [
                                            {
                                                Linear: [
                                                    {
                                                        MediaFiles: [
                                                            {
                                                                MediaFile: {
                                                                    _attr: { type: "application/javascript", apiFramework: "VPAID", height: height, width: width, delivery: "progressive" },
                                                                    _cdata: `https://cheq.com/vpaid.js?vast=${vast_url}&position=${position}&vastId=${id}`
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }]
        }];

    else xml = [{ VAST: [{ _attr: { version: "2.0" } }] }]

    return xml;
};

module.exports = getXML;