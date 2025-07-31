import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import GenericTrack from "@/models/track/GenericTrack";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import GenericArtist from "@/models/artist/GenericArtist";

interface AddTrackDialogProps {
    addSelectedTrack: (track: GenericTrack) => void
}

export default function AddTrackDialog({addSelectedTrack}: AddTrackDialogProps) {

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [artists, setArtists] = useState("");

    const addTrack = () => {
        const track = new GenericTrack(name, artists.split(',').map((a: string) =>
            new GenericArtist(a.trim())
        ))
        addSelectedTrack(track);
        setOpen(false);
        setName("");
        setArtists("");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={"p-0 m-0 h-7 w-7 aspect-square flex items-center justify-center rounded-md text-2xl"}>
                +
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto min-w-1/3"}>
                <DialogHeader>
                    <DialogTitle>Add Track</DialogTitle>
                    <DialogDescription>Add tracks to inspire your playlist</DialogDescription>
                </DialogHeader>
                <div className={"flex flex-row items-center justify-center gap-4"}>
                    <label htmlFor={"name"}>Name: </label>
                    <Input name={"name"} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={"flex flex-row items-center justify-center gap-4"}>
                    <label htmlFor={"artists"}>Artists <span className={"text-xs opacity-80"}>(comma seperated)</span>: </label>
                    <Input name={"artists"} value={artists} onChange={(e) => setArtists(e.target.value)} />
                </div>
                <Button onClick={addTrack}>Add Track</Button>
            </DialogContent>
        </Dialog>
    );
}