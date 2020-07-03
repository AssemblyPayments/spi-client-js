import { Events, Message } from "../src/Messages";
import { ReversalRequest, ReversalResponse } from "../src/Reversal";

describe("Reversal,", () => {
  let posRefId;

  beforeAll(() => {
    const {
      message: {
        data: { pos_ref_id },
      },
    } = __fixtures__.ReversalResponse_Success;
    posRefId = pos_ref_id;
  });

  describe("ReversalRequest()", () => {
    it("should be created", () => {
      // arrange

      // act
      const reversalRequest = new ReversalRequest(posRefId);
      // assert
      expect(reversalRequest.PosRefId).toBe(posRefId);
    });

    it("should convert ReversalRequest to a message", () => {
      // arrange
      const reversalRequest = new ReversalRequest(posRefId);

      // act
      const message = reversalRequest.ToMessage();

      // assert
      expect(message.EventName).toBe(Events.ReversalRequest);
      expect(message.Data.pos_ref_id).toBe(posRefId);
    });
  });

  describe("ReversalResponse()", () => {
    let responseMessage;

    beforeAll(() => {
      responseMessage = Message.FromJson(
        JSON.stringify(__fixtures__.ReversalResponse_Error)
      );
    });

    it("should be created", () => {
      // arrange

      // act
      const reversalResponse = new ReversalResponse(responseMessage);

      // assert
      expect(reversalResponse.PosRefId).toBe(posRefId);
      expect(reversalResponse.Success).toBeFalse();
    });

    it("should GetErrorReason()", () => {
      // arrange
      const reversalResponse = new ReversalResponse(responseMessage);

      // act
      const errorReason = reversalResponse.GetErrorReason();

      // assert
      expect(errorReason).toBe(responseMessage.Data.error_reason);
    });

    it("should GetErrorDetail()", () => {
      // arrange
      const reversalResponse = new ReversalResponse(responseMessage);

      // act
      const errorDetail = reversalResponse.GetErrorDetail();

      // assert
      expect(errorDetail).toBe(responseMessage.Data.error_detail);
    });
  });
});
