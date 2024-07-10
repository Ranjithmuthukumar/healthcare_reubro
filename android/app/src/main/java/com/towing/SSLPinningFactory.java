package com.towing.onerescue;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinningFactory implements OkHttpClientFactory {
   private static String hostname = "towing.kclaims.com.my";
   public OkHttpClient createNewNetworkModuleClient() {
      CertificatePinner certificatePinner = new CertificatePinner.Builder()
        .add(hostname, "sha256/SyTxRKkmjvJyn+mCztlFM4qDU4xmjacHDimzNYqytpg=")
        .build();
      OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
      return clientBuilder.certificatePinner(certificatePinner).build();
  }
}
