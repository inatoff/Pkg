 namespace Terrasoft.Configuration.irePropertyServiceNamespace
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
	using Core.Entities;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Factories;
    using Terrasoft.Common;
	using Terrasoft.Configuration;
    using Terrasoft.Web.Common;
    using Terrasoft.Core.Entities; 
	using Terrasoft.Core.ServiceModelContract;
	using System.Runtime.Serialization;
	using Terrasoft.Core.Factories;
	using Terrasoft.Web.Common.ServiceRouting;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	
    public class IrePropertyService: BaseService
    {
		private const string PROPERTY_TABLE_NAME = "ireProperty";
		private const string PROPERTY_PRICE_COLUMN_NAME = "irePropertyPrice";
		private const string PROPERTY_TYPE_COLUMN_NAME = "irePropertyTypeId";
		private const string PROPERTY_OFFER_TYPE_COLUMN_NAME = "irePropertyOfferTypeId";
        
		[OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public float GetPropertiesPricesSummaryByTypeAndOfferType(Guid propertyType, Guid offerType) {
			var isEmptyPropertyType = propertyType == null || propertyType == Guid.Empty;
			var isEmptyOfferType = offerType == null || offerType == Guid.Empty;
            if (isEmptyPropertyType || isEmptyOfferType) {
                return -1;
            }
			
			var selectSum = new Select(UserConnection)
				.Column(Func.Sum(PROPERTY_PRICE_COLUMN_NAME))
				.From(PROPERTY_TABLE_NAME)
				.Where(PROPERTY_TYPE_COLUMN_NAME)
					.IsEqual(Column.Parameter(propertyType))
				.And(PROPERTY_OFFER_TYPE_COLUMN_NAME)
					.IsEqual(Column.Parameter(offerType)) as Select;
            var result = selectSum.ExecuteScalar<float>();
            
            return result;
        }
    }
	 
}