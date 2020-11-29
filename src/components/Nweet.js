import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (ok) {
                await dbService.doc(`nweets/${nweetObj.id}`).delete();
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewNweet(value);
    }
    return (
        <div className="nweet">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input
                                    type="text"
                                    placeholder="Edit your nweet"
                                    value={newNweet}
                                    required
                                    onChange={onChange} />
                                    <input className="formBtn" type="submit" value="Update Nweet" />
                            </form>
                            <button className="formBtn cancelBtn" onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                    
                </>
            ) : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                {isOwner && (
                    <div class="nweet__actions">
                        <button onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                    </div>
                )}
                </>
            )}
        </div>
    );
}

export default Nweet;