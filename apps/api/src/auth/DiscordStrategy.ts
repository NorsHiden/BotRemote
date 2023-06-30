import { Inject, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, Profile } from "passport-discord"
import { AuthService } from "./auth.service"


@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
        super({
                clientID: '1123389644764090538',
                clientSecret: 'i6AJ3Hc_Up8Yo_gi8VGeScfQaMJhURSW',
                callbackURL: 'http://localhost:3000/api/auth/redirect',
                scope: ['identify', 'guilds'],
            })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile ) {
        const user = await this.authService.validateUser({
            userID: profile.id,
            displayName: profile.global_name,
            accessToken: accessToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
        });
        return user || null;
    }
}