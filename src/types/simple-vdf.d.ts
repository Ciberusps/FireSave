declare module "simple-vdf" {
  interface IVDF {
    parse<T>(file: string): T;
    stringify(obj: Object): string;
  }

  const VDF: IVDF;

  export default VDF;
  export { IVDF };
}
