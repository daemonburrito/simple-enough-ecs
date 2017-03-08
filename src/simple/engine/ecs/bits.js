// Binary tools

// Static bag of tools
class BinTool {
  static BIG_ENDIAN = Symbol('BIG_ENDIAN');
  static LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

  static getPlatformEndianness () {
    const arr32 = Uint32Array.of(0x12345678);
    const arr8 = new Uint8Array(arr32.buffer);
    switch ((arr8[0]*0x1000000) +
      (arr8[1]*0x10000) +
      (arr8[2]*0x100) +
      (arr8[3])) {
        case 0x12345678:
            return self.BIG_ENDIAN;
        case 0x78563412:
            return self.LITTLE_ENDIAN;
        default:
            throw new Error('Unknown endianness');
    }
  }
}

export {
  BinTool
};