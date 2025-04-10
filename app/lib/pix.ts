/**
 * Types of PIX keys accepted in Brazil
 */
type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';

/**
 * Interface for payment information required to generate a PIX code
 */
interface PixPaymentInfo {
  keyType: PixKeyType;
  key: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txid?: string;
  description?: string;
}

/**
 * Interface for EMV ID constants
 */
interface EmvIds {
  PAYLOAD_FORMAT_INDICATOR: string;
  MERCHANT_ACCOUNT_INFO: string;
  MERCHANT_CATEGORY_CODE: string;
  TRANSACTION_CURRENCY: string;
  TRANSACTION_AMOUNT: string;
  COUNTRY_CODE: string;
  MERCHANT_NAME: string;
  MERCHANT_CITY: string;
  ADDITIONAL_DATA_FIELD: string;
  CRC16: string;
}

/**
 * Generates a PIX code for Brazilian payment system
 * @param paymentInfo - Payment information object
 * @returns The generated PIX code string
 */
function generatePixCode(paymentInfo: PixPaymentInfo): string {
  // Validate required fields
  if (!paymentInfo.keyType || !paymentInfo.key || !paymentInfo.merchantName ||
    !paymentInfo.merchantCity || paymentInfo.amount === undefined) {
    throw new Error("Missing required payment information");
  }

  // PIX payload format constants
  const IDs: EmvIds = {
    PAYLOAD_FORMAT_INDICATOR: "00",
    MERCHANT_ACCOUNT_INFO: "26",
    MERCHANT_CATEGORY_CODE: "52",
    TRANSACTION_CURRENCY: "53",
    TRANSACTION_AMOUNT: "54",
    COUNTRY_CODE: "58",
    MERCHANT_NAME: "59",
    MERCHANT_CITY: "60",
    ADDITIONAL_DATA_FIELD: "62",
    CRC16: "63"
  };

  // Build the payload format indicator
  const payloadFormatIndicator: string = buildEMVData(IDs.PAYLOAD_FORMAT_INDICATOR, "01");

  // Build merchant account information
  const merchantAccountInfo: string = buildMerchantAccountInfo(paymentInfo.keyType, paymentInfo.key, IDs);

  // Merchant Category Code (fixed for PIX)
  const merchantCategoryCode: string = buildEMVData(IDs.MERCHANT_CATEGORY_CODE, "0000");

  // Transaction Currency (fixed for BRL - Brazilian Real)
  const transactionCurrency: string = buildEMVData(IDs.TRANSACTION_CURRENCY, "986");

  // Transaction Amount (optional)
  let transactionAmount: string = "";
  if (paymentInfo.amount > 0) {
    transactionAmount = buildEMVData(IDs.TRANSACTION_AMOUNT, paymentInfo.amount.toFixed(2));
  }

  // Country Code (fixed for Brazil)
  const countryCode: string = buildEMVData(IDs.COUNTRY_CODE, "BR");

  // Merchant Name
  const merchantName: string = buildEMVData(IDs.MERCHANT_NAME, paymentInfo.merchantName);

  // Merchant City
  const merchantCity: string = buildEMVData(IDs.MERCHANT_CITY, paymentInfo.merchantCity);

  // Additional Data Field (optional)
  let additionalDataField: string = "";
  if (paymentInfo.txid || paymentInfo.description) {
    let txidData: string = "";
    if (paymentInfo.txid) {
      txidData = buildEMVData("05", paymentInfo.txid);
    }

    let descriptionData: string = "";
    if (paymentInfo.description) {
      descriptionData = buildEMVData("08", paymentInfo.description);
    }

    additionalDataField = buildEMVData(IDs.ADDITIONAL_DATA_FIELD, txidData + descriptionData);
  }

  // Build the main payload (without CRC)
  const payload: string = payloadFormatIndicator +
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    transactionAmount +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField +
    IDs.CRC16 + "04";

  // Calculate CRC16 and append it
  const crc: string = calculateCRC16(payload);
  const pixCode: string = payload + crc;

  return pixCode;
}

/**
 * Builds EMV data in ID-Length-Value format
 * @param id - The ID of the data element
 * @param value - The value of the data element
 * @returns The formatted EMV data
 */
function buildEMVData(id: string, value: string): string {
  const length: string = value.length.toString().padStart(2, "0");
  return id + length + value;
}

/**
 * Builds the merchant account information field for PIX
 * @param keyType - PIX key type
 * @param key - PIX key value
 * @param ids - EMV ID constants
 * @returns The formatted merchant account information
 */
function buildMerchantAccountInfo(keyType: PixKeyType, key: string, ids: EmvIds): string {
  // PIX GUI (fixed value for Brazilian PIX system)
  const gui: string = buildEMVData("00", "br.gov.bcb.pix");

  // Format the key according to its type
  let formattedKey: string;
  switch (keyType.toLowerCase() as PixKeyType) {
    case "cpf":
      formattedKey = buildEMVData("01", key);
      break;
    case "cnpj":
      formattedKey = buildEMVData("02", key);
      break;
    case "email":
      formattedKey = buildEMVData("03", key);
      break;
    case "phone":
      // Ensure phone is in international format without '+' sign
      const phoneKey: string = key.startsWith("+") ? key.substring(1) : key;
      formattedKey = buildEMVData("04", phoneKey);
      break;
    case "random":
      formattedKey = buildEMVData("05", key);
      break;
    default:
      throw new Error("Invalid PIX key type");
  }

  // Combine GUI and key data
  const merchantAccountData: string = gui + formattedKey;

  // Return complete merchant account information
  return buildEMVData(ids.MERCHANT_ACCOUNT_INFO, merchantAccountData);
}

/**
 * Calculates CRC16 for the PIX payload
 * Based on CRC-16/CCITT-FALSE polynomial
 * @param payload - The payload to calculate CRC for
 * @returns The calculated CRC as a 4-character hexadecimal string
 */
function calculateCRC16(payload: string): string {
  // CRC-16/CCITT-FALSE parameters
  const polynomial: number = 0x1021;
  let crc: number = 0xFFFF;

  // Convert string to byte array
  const data: number[] = [];
  for (let i = 0; i < payload.length; i++) {
    data.push(payload.charCodeAt(i));
  }

  // Calculate CRC
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i] << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
    }
  }

  // Ensure CRC is a 16-bit value and convert to hex
  crc = crc & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// Export the function for use in other modules
export { generatePixCode };

// Export the types explicitly as types
export type { PixPaymentInfo, PixKeyType };