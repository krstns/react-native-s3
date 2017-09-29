#if __has_include("React/RCTBridgeModule.h")
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#else
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#endif

#import <AWSCore/AWSCore.h>
#import <AWSS3/AWSS3.h>

typedef NS_ENUM(NSInteger, CredentialType) {
    BASIC,
    COGNITO
};

@interface RNS3TransferUtility : RCTEventEmitter
+ (NSMutableDictionary*)nativeCredentialsOptions;
+ (CredentialType)credentialType: (NSString *)type;
+ (void)interceptApplication: (UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)(void))completionHandler;
@end
