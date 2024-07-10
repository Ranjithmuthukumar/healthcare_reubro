#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 [GMSServices provideAPIKey:@"AIzaSyD40Zbj3E3PBkzZBzZ3A37vU2zrM2ayZt4"]; // add this line using the api key obtained from Google Console
  [FIRApp configure];
  self.moduleName = @"Towing";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];

//  NSURL *jsUrl = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//  [[RCTBundleURLProvider sharedSettings] setJsLocation:jsUrl.host];
//  return jsUrl;
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
