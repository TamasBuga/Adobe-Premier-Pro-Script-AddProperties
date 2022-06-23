app.enableQE();
qe.project.getSequenceAt(0).flushCache();

var qeSequence = qe.project.getSequenceAt(0);
var qeClip,
    qeTrack,
    clipComponent;

var videoTracks = app.project.activeSequence.videoTracks;

// Végig megyünk a track elemeken
for (var c1 = 0; c1 < videoTracks.numTracks; c1++) {

    // Beállítunk egy kilépési pontot, ha false a track loop megy tovább, ha true kilép az egész loop-ból
    var exitLoop = false;

    qeTrack = qeSequence.getVideoTrackAt(c1);

    // Végig megyünk a track itemeken(clips)
    for (var c2 = 0; c2 < qeTrack.numItems; c2++) {

        // Ha a clipp nem null
        if (qeTrack.getItemAt(c2) != null) {

            // Ha a clip típusa nem "Empty"
            if (qeTrack.getItemAt(c2).type.toString() != "Empty") {

                // Ha a clip ki van választva
                if (clip_is_selected(qeTrack.getItemAt(c2), c1)) {

                    // Ha az összes feltétel igaz, akkor a kilépési pontot aktiváljuk és kilépünk a loop-ból
                    exitLoop = true;

                    // Hozzáadjuk a clip-hez a megadott "effect"-et
                    qeClip = qeSequence.getVideoTrackAt(c1).getItemAt(c2);
                    qeClip.addVideoEffect(qe.project.getVideoEffectByName(effect));

                    // Beletesszük az összes componenst egy változóba
                    var components = app.project.activeSequence.videoTracks[c1].clips[c2].components;

                    // Végig megyünk a componenseken
                    for (var c3 = 0; c3 < qeClip.numComponents; c3++) {

                        // Ha megtalálta az effect-et...
                        if (qeClip.getComponentAt(c3).name == effect) {

                            // Egy változóba tesszük az összes beállítást
                            var propertie = get_properties(qeClip.getComponentAt(c3).name, qeClip.name);

                            // Ide jönnek a paraméter beállítások !
                            // =====================================================================================================
                            propertie[0].setValue(40, 1);



                            // =====================================================================================================

                            // Kilépünk a loop-ból, ha csak az első effecten akarunk változtatni
                            break;
                        }
                    }

                    // qeClip & clip test
                    // $.writeln(app.project.sequences[0].videoTracks[c1].clips[c2].name + ", " + qeClip.type);

                    break;

                }
            }
        }
    }

    // Ha a kilépési pont true, akkor kilép az egész loop-ból
    if (exitLoop) break;

}

// Ez a function megvizsgálja hogy a clip kivan-e választva, ha igen akkor egy "true"-t ad vissza paraméternek, ha nem "false"-t
function clip_is_selected(qeClip, trackIndex) {

    for (var v1 = 0; v1 < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; v1++) {
        if (app.project.activeSequence.videoTracks[trackIndex].clips[v1].name == qeClip.name) {
            if (app.project.activeSequence.videoTracks[trackIndex].clips[v1].isSelected()) {
                return true;
            }
        }
    }
    return false;
}