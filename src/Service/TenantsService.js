export class TenantsService {
  static async RetrieveTenantsList(posVendorId, apiKey, countryCode) {
    const tenantsServiceUri = `https://spi.integration.mspenv.io/tenants?country-code=${countryCode}&pos-vendor-id=${posVendorId}&apikey=${apiKey}`;

    const response = await fetch(tenantsServiceUri);
    let responseJson;
    
    try {
      responseJson = await response.json();
      return responseJson;
    } catch {
      throw new Error('No JSON returned');
    }
  }
}
