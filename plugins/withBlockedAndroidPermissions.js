const { AndroidConfig } = require("expo/config-plugins");

// Safety guard: explicitly block permissions that should never appear
// in the final AndroidManifest even if a transitive dependency tries to add them.
const BLOCKED_PERMISSIONS = [
	"android.permission.READ_MEDIA_IMAGES",
	"android.permission.READ_MEDIA_VIDEO",
	"android.permission.READ_MEDIA_AUDIO",
	"android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
	"android.permission.READ_EXTERNAL_STORAGE",
	// Added by Firebase Analytics (play-services-measurement). The app shows no ads,
	// so the advertising ID is not needed.
	"com.google.android.gms.permission.AD_ID",
];

module.exports = function withBlockedAndroidPermissions(config) {
	return AndroidConfig.Permissions.withBlockedPermissions(
		config,
		BLOCKED_PERMISSIONS,
	);
};
