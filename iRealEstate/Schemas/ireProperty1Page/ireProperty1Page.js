define("ireProperty1Page", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "ireProperty",
		attributes: {
			"irePropertyServiceFee": {
				dependencies: [
					{
						columns: ["irePropertyOfferType"],
						methodName: "calculateServiceFee"
					},
					{
						columns: ["irePropertyPrice"],
						methodName: "calculateServiceFee"
					}
				]
			},
		},
		messages: {
			"irePropertyViewsCreated": {
				"mode": Terrasoft.MessageMode.BROADCAST,
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		modules: {},
		details: {
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "irePropertyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "ireProperty"
				}
			},
			"ireSchema9039d743Detail6e11f969": {
				"schemaName": "ireSchema9039d743Detail",
				"entitySchemaName": "irePropertyViews",
				"filter": {
					"detailColumn": "irePropertyLookup",
					"masterColumn": "Id"
				}
			}
		},
		businessRules: {
            "ireNotes": {
                "2ed4f988-ff82-43ad-ac4a-07abed12228a": {
                    "uId": "2ed4f988-ff82-43ad-ac4a-07abed12228a",
                    "enabled": true,
                    "removed": false,
                    "ruleType": 0,
                    "property": 2,
                    "logical": 0,
                    "conditions": [
                        {
                            "comparisonType": 7,
                            "leftExpression": {
                                "type": 1,
                                "attribute": "irePropertyPrice"
                            },
                            "rightExpression": {
                                "type": 0,
                                "value": 100000,
                                "dataValueType": 5
                            }
                        }
                    ]
                }
            },
		},
		methods: {
           calculateServiceFee: function() {
                var price = this.get("irePropertyPrice");
                var offerType = this.get("irePropertyOfferType");
                var calculatedValue;

                if (offerType && offerType.displayValue === "Аренда") {
                    calculatedValue = price * 0.5;
                } else if (offerType && offerType.displayValue === "Продажа") {
                    calculatedValue = price * 0.02;
                } else {
                    calculatedValue = null; // Set default value or handle other offer types
                }

                this.set("irePropertyServiceFee", calculatedValue);
            },
			onlyPositiveValues: function(value) {
				return {
					invalidMessage: (value && value < 0) ? 'Отрицательное значение недопустимо' : ''
				};
			},	
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getActionsMenuItem({
                    "Caption": { bindTo: "Resources.Strings.AddViews" },
                    "Tag": "getBusinessProcessAddViews",
                    "Visible": true
                }));
                return actionMenuItems;
			},
			updateViews: function() {
				this.updateDetail({
					"detail": "ireSchema9039d743Detail6e11f969",
					"reloadAll": true
				});
			},
			getBusinessProcessAddViews: function() {
				var id = this.get("Id");
				var args = {
					sysProcessName: "ireAddPropertyViewsProcess",
					parameters: {
						PropertyId: id
					}
				};
				ProcessModuleUtilities.executeProcess(args);
			},
			init: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("irePropertyViewsCreated", this.updateViews, this);
			},
            onEntityInitialized: function() {
				this.callParent(arguments);
                this.calculateServiceFee();
            },
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("irePropertyPrice", this.onlyPositiveValues);
				this.addColumnValidator("irePropertyArea", this.onlyPositiveValues);
			}
        },
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ireName2d65c1bd-5122-45b8-827a-65bb965aebb2",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "ireName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CreatedBy81ad2c96-9f31-43a8-a067-311efbb3dd6f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CreatedBy",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CreatedOn7a8939dc-058e-491b-bf21-98590cb93773",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CreatedOn",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ModifiedByb9c32655-38a5-4773-8f7e-e6a175d216ad",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "ModifiedBy",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ModifiedOne6e87d5b-8afa-44b6-8043-78bd33d5e32e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "ModifiedOn",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ServiceFeef3baaab6-6e19-4fdf-a6d3-c3896b6bb9b9",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "irePropertyServiceFee",
					"tip": {
						"content": {
							"bindTo": "Resources.Strings.FLOATf3baaab66e194fdfa6d3c3896b6bb9b9Tip"
						}
					},
					"enabled": false,
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "FLOAT46ec88a1-28ca-4c6a-9510-d345c56a8252",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "irePropertyArea",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP97c9cd7c-6fea-4b9f-a0ab-7f9a5627c5fe",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "irePropertyOfferType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT9dd9ee02-7ed4-4a1f-9b4a-9691f51f7a4d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "irePropertyPrice",
					"enabled": true,
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP5a7294a4-1f8c-4e14-9f7b-dbccd381ffb8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "irePropertyType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ireNotes38dfa986-6fac-4515-8e4e-0b9df05aca38",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "ireNotes",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "ireNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ireSchema9039d743Detail6e11f969",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
