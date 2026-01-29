package com.sahabakery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileUploadService {

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    private Cloudinary cloudinary;

    @PostConstruct
    public void init() {
        if (cloudName != null && !cloudName.isEmpty()) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret));
        }
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (cloudinary == null) {
            // Fallback for local dev if Cloudinary credentials are missing
            // But for deployment, this should ideally be configured
            throw new RuntimeException("Cloudinary not configured");
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return (String) uploadResult.get("secure_url");
    }

    public void deleteFile(String fileUrl) throws IOException {
        // Cloudinary deletion requires public_id
        // Extracting public_id from URL is complex, skipping for now as it's optional
        // feature
        // Ideally, store public_id in database.
    }
}
