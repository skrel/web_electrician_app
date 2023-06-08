import React, { useState } from "react"
import styles from '../styles/Home.module.css'



const AddItem = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <div>
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Add Single Item
                </button>
            </div>

            {showModal ? (
                <div className={styles.modal}>
                    <div>
                        
                        {/* add onSubmit={} to the form */}
                        <form >
                            <input
                                type='text'
                                name='itemname'
                                placeholder='Enter name'
                            // onChange={(event) => setUsername(event.target.value)}
                            // value={username}
                            />
                            <input
                                type='text'
                                name='itempurpose'
                                placeholder='Enter purpose'
                            // onChange={(event) => setPassword(event.target.value)}
                            // value={password}
                            />
                            <input
                                type='text'
                                name='itemqty'
                                placeholder='Enter qty'
                            // onChange={(event) => setPassword(event.target.value)}
                            // value={password}
                            />
                            <input
                                type='text'
                                name='itemprice'
                                placeholder='Enter price'
                            // onChange={(event) => setPassword(event.target.value)}
                            // value={password}
                            />

                            <button type='submit'>Add</button>
                        </form>
                    </div>
                    <button onClick={() => setShowModal(false)}>Close</button>  
                </div>
            ) : null}
        </div>

    )

}

export default AddItem