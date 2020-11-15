import * as FileSaver from "file-saver";
import axios from "axios";
import { apiUrl } from "./config";

export class GenerateAttestationService {
  generate(formData: any) {
    axios.post(apiUrl, formData, {
      responseType: "blob"
    }).then((res: { data: string | Blob; }) => {
      const now = new Date();
      FileSaver.saveAs(res.data, `attestation-${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.pdf`);
    });
  }
}
