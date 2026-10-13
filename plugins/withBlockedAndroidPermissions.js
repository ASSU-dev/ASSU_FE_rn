const { AndroidConfig } = require("expo/config-plugins");

// Safety guard: explicitly block media permissions that should never appear
// in the final AndroidManifest even if a transitive dependency tries to add them.
const BLOCKED_PERMISSIONS = [
	"android.permission.READ_MEDIA_IMAGES",
	"android.permission.READ_MEDIA_VIDEO",
	"android.permission.READ_MEDIA_AUDIO",
	"android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
	"android.permission.READ_EXTERNAL_STORAGE",
];

module.exports = function withBlockedAndroidPermissions(config) {
	return AndroidConfig.Permissions.withBlockedPermissions(
		config,
		BLOCKED_PERMISSIONS,
	);
};
