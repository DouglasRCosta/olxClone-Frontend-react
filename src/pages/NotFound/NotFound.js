import React from "react";
import { PageContainer } from "../../components/MainComponents";
import './notfound.css'

export const NotFound = () => {
    return (
        <div className="notfound">
            <PageContainer>
                <h1>
                    404 Página Não Encontrada.
                </h1>
            </PageContainer>
        </div>
    )
}