<div id="openseadragon1" style="width: 100%; height: 600px;"></div>
<script src="/assets/js/openseadragon/openseadragon.min.js"></script>
<script type="text/javascript">
    var viewer = OpenSeadragon({
        id: "openseadragon1",
        prefixUrl: "/assets/js/openseadragon/images/",
        tileSources: "/assets/autobiography/tiles/01.dzi",
    	gestureSettingsMouse:   { scrollToZoom: false },
        gestureSettingsTouch:   { scrollToZoom: false },
        gestureSettingsPen:     { scrollToZoom: false },
        gestureSettingsUnknown: { scrollToZoom: false }
    });
</script>