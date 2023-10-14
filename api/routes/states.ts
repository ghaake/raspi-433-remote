import { Router, Request, Response } from 'express';
import { readStates } from '../../store/store';

const router = Router();

router.get( "/v1/state/:id", ( req: Request, res: Response ) => {
    const id = req.params.id;
    const states = readStates();

    if( states[id] !== undefined )
    {
        res.status( 200 ).send( states[id] );
    }
    else 
    {
        res.status( 200 ).send( "unknown" );
    }
} );

export default router;