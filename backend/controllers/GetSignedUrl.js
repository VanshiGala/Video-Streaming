import { GetObjectCommand } from "@aws-sdk/client-s3"; //retrieve obj from bucket
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; //function to generate pre-signedUrl
import s3 from "../config/s3Config.js";

export const getSignedVideoUrl = async (req, res) => {
  try {
    // const key  = decodeURIComponent(req.params.key); //decodedURIComponent -> used if the key might contain special char
    const key = req.params[0]; //extract obj key/path
    console.log("Key received: ", key)
   if (!key) {
      console.log(" Missing 'key' in signed URL request");
      return res.status(400).json({ error: "Missing key parameter" });
    }

    //create GetObjCommand that represent req to fetch specific obj
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key, //identify exact key in bucket
    });

    // Generate pre-signed URL valid for 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.json({ signedUrl }); //send back to the client so frontend can use
  } catch (error) {
    console.error("Error generating signed URL:", error.message);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};
