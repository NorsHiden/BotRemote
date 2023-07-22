import { Test, TestingModule } from '@nestjs/testing';
import { OauthController } from '../controllers/oauth.controller';
import { OAuthService } from '../services/oauth.service';

describe('OauthController', () => {
  let controller: OauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OauthController],
      providers: [OAuthService],
    }).compile();

    controller = module.get<OauthController>(OauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
