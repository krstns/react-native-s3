declare module "react-native-s3" {
	interface BasicOptions {
		region: string; // a S3 Region (default: eu-west-1)
		access_key: string; // the AWS access key ID
		secret_key: string; // the AWS secret access key
		session_token: string; // (optional)
		remember_last_instance: boolean; // keep the last transferUtility instance when JS reload (default: true) __(iOS)__
	}

	interface CognitoOptions {
		region: string; // a S3 Region (default: eu-west-1)
		identity_pool_id: string; // the Amazon Cogntio identity pool
		cognito_region: string; // a Cognito Region (default: eu-west-1)
		caching: boolean; // use `CognitoCachingCredentialsProvider` instead of `CognitoCredentialsProvider` __(Android)__
		remember_last_instance: boolean; // keep the last transferUtility instance when JS reload (default: true) __(iOS)__
	}

	interface UploadOptions {
		bucket: string; // a S3 bucket name
		key: string; // the object key/destination in the bucket
		file: string; // the file path to upload
		meta: {
			"Content-Type": string; // the file content-type
		};
	}

	interface DownloadOptions {
		bucket: String; // a S3 bucket name
		key: String; // the object key/destination in the bucket
		file: String; // donwload save file path
	}

	interface Task {
		id: number;
		state: "waiting" | "in_progress" | "paused" | "canceled" | "completed" | "failed";
		bytes: number;
		totalBytes: number;
		bucket: string;
		key: string;
	}

	type TaskMap = { [id: string]: Task; };

	interface TransferUtility {
		setupWithNative(): Promise<boolean>;
		setupWithBasic(options: BasicOptions): Promise<boolean>;
		setupWithCognito(options: CognitoOptions): Promise<boolean>;

		enableProgressSent(enabled: boolean): Promise<void>;

		upload(options: UploadOptions): Promise<Task>;
		download(options: DownloadOptions): Promise<Task>;

		pause(taskID: number);
		resume(taskID: number);
		cancel(taskID: number);

		deleteRecord(taskID: number): Promise<boolean>; // __(Android)__

		getTask(taskID: number): Promise<Task>;
		getTasks(type: "upload" | "download", idAsKey: boolean): Task[] | TaskMap;

		// Subscribe to task changes with the given id.
		subscribe(taskID: number, eventHandler: (err: object, task: Task) => void): void;

		// Unsubscribe task change listener `eventHandler` with the given id.
		// If `eventHandler` is not exists, it will unsubscribe all task change listeners with the given id.
		unsubscribe(taskID: number, eventHandler?: (err: object, task: Task) => void): void;
	}

	export const transferUtility: TransferUtility;
}
