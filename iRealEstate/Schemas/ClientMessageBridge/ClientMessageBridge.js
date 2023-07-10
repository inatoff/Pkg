 define("ClientMessageBridge", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            messages: {
                "irePropertyViewsCreated": {
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    "direction": Terrasoft.MessageDirectionType.PUBLISH
                }
            },
            methods: {
                init: function() {
                    this.callParent(arguments);
                    this.addMessageConfig({
                        sender: "irePropertyViewsCreated",
                        messageName: "irePropertyViewsCreated"
                    });
                
                }
            }
        };
    });