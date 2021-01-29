import { TenantsService } from "../../src/Service/TenantsService";

describe("TenantsService", () => {
  let fetchHelper;

  beforeEach(() => {
    const fetchPromise = new Promise((resolve, reject) => {
      fetchHelper = { resolve, reject };
    });
    spyOn(window, "fetch").and.returnValue(fetchPromise);
  });

  it("should successfully get a list of tenants", async () => {
    // arrange
    const apiKey = 12345;
    const countryCode = "AU";
    const posVendorId = "spi-sample-pos";
    fetchHelper.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    }); // Mock the response from the api

    // act
    const response = await TenantsService.RetrieveTenantsList(
      apiKey,
      countryCode,
      posVendorId
    );

    // assert
    expect(window.fetch).toHaveBeenCalledWith(
      jasmine.stringMatching(/tenants\?country-code=AU&pos-vendor-id=spi-sample-pos&apikey=12345/)
    );
    expect(response.success).toBeTrue();
  });

  it("should throw an error when the request returned an status code other than 2xx", async () => {
    // arrange
    const apiKey = "spi-sample-pos";
    const countryCode = "AU";
    fetchHelper.resolve({
      ok: false,
      json: () => Promise.reject({}),
    }); // Mock the response from api

    // act
    let errorReturned = null;

    try {
      await TenantsService.RetrieveTenantsList(
        apiKey,
        countryCode
      );
    } catch (error) {
      errorReturned = error;
    }

    // assert
    expect(errorReturned).toBeInstanceOf(Error);
    expect(errorReturned.message).toMatch(/No JSON/);
  });
});
