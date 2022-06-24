import React, { ChangeEvent, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { AppDispatch } from '../../app/store'
import { A } from '../../components/A'
import { BigButton } from '../../components/BigButton'
import { Input } from '../../components/Input'
import { createGameAsync } from '../../slices/gameSlice'

const createGameClick = (dispatch: AppDispatch, navigate: NavigateFunction) => async () => {
    const result = await dispatch(createGameAsync())
    if (result.meta.requestStatus === 'fulfilled') {
        navigate(`/join/${result.payload}`)
    }
}

export const Splash = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [text, setText] = useState('')

    return (
        <div className="max-w-screen-md mx-3 md:mx-auto md:pt-16">
            <main className="flex flex-col">
                <h1>Agon Dice Roller</h1>
                <p className="pb-6">
                    This is a fan-made dice-rolling app for AGON. AGON is an action-packed roleplaying game about epic
                    Heroes who face trials from the Gods in an ancient world of myth and legend. Learn more about it,
                    and the Paragon system, at <A href="http://agon-rpg.com">agon-rpg.com</A>
                </p>
                <section>
                    <h3>Start a New Session</h3>
                    <p className="pb-6">
                        Start a new session. You'll be able to invite other players with a unique URL.
                    </p>
                    <BigButton className="mb-6" onClick={createGameClick(dispatch, navigate)}>
                        Start New Game
                    </BigButton>
                </section>
                <section>
                    <h3>Have an Invite Link?</h3>
                    <p className="pb-6">Paste it below or in your browser and click Join Game.</p>
                    <Input
                        className="mb-6 w-full"
                        aria-label="Existing game id"
                        value={text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                        placeholder="Existing game id"
                    />
                    <BigButton className="mb-6" onClick={() => navigate(`/join/${text}`)}>
                        Join Game
                    </BigButton>
                </section>
            </main>
            <aside className="flex flex-col">
                <h3>About this App</h3>
                <p className="pb-3">At least one person playing should be familiar with the AGON rulebook.</p>
                <p className="pb-3">
                    This app is a lightweight dicerolling app, focused on resolving and narrating AGON Contests. It is
                    not a campaign or character tracker - you'll still need to manage that on your own.
                </p>
                <p className="pb-3">
                    This app was created by <A href="">@gareth</A> and <A href="">@sporgory</A> with the help of the{' '}
                    <A href="">AGON fan Discord community</A>.
                </p>
                <p className="pb-3 mb-64">
                    If you’d like to give feedback or get involved, check out the{' '}
                    <A href="https://github.com/gareththegeek/rollagon">GitHub repo</A>.
                </p>
            </aside>
        </div>
    )
}
