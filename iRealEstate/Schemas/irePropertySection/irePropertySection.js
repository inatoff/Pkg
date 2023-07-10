define("irePropertySection", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "ireProperty",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		methods: {
			getSectionActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getButtonMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));
                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": {bindTo: "Resources.Strings.AddViews"},
                    "Click": {bindTo: "getBusinessProcessAddViews"},
                    "Enabled": true
                }));
                return actionMenuItems;
            },
			getBusinessProcessAddViews: function() {
                var activeRowId = this.get("ActiveRow");
                var gridData = this.get("GridData");
				debugger;
                var id = gridData.get(activeRowId).get("Id");
				var args = {
					sysProcessName: "ireAddPropertyViewsProcess",
					parameters: {
						PropertyId: id
					}
				};
				ProcessModuleUtilities.executeProcess(args);
			},
		}
	};
});
