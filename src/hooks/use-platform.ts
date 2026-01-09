export function usePlatform() {
	const ua = navigator.userAgent;

	if (/android/i.test(ua)) return "android";
	if (/iPad|iPhone|iPod/.test(ua)) return "ios";
	if (/Win/.test(ua)) return "windows";
	if (/Mac/.test(ua)) return "mac";
	if (/Linux/.test(ua)) return "linux";

	return "unknown";
}
