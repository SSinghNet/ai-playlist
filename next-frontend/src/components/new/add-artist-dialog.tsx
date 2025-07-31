import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import GenericArtist from "@/models/artist/GenericArtist";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";

interface AddArtistDialogProps {
    addSelectedArtist: (artist: GenericArtist) => void
}

export default function AddArtistDialog({addSelectedArtist}: AddArtistDialogProps) {

    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");

    const addArtist = () => {
        const artist = new GenericArtist(name);
        addSelectedArtist(artist);
        setOpen(false);
        setName("");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={"p-0 m-0 h-7 w-7 aspect-square flex items-center justify-center rounded-md text-2xl"}>
                +
            </DialogTrigger>
            <DialogContent className={"overflow-y-auto min-w-1/3"}>
                <DialogHeader>
                    <DialogTitle>Add Artist</DialogTitle>
                    <DialogDescription>Add artists to inspire your playlist</DialogDescription>
                </DialogHeader>
                <div className={"flex flex-row items-center justify-center gap-4"}>
                    <label htmlFor={"name"}>Name: </label>
                    <Input name={"name"} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <Button onClick={addArtist}>Add Artist</Button>
            </DialogContent>
        </Dialog>
    );
}